const yup = require('yup');
const Sequelize = require('sequelize');
const models = require('../models');

class PeopleController {
  async get(req, res, next) {
    const { age, latitude, longitude, monthlyIncome, experienced } = req.query;
    const limit = 100;

    const schema = yup.object().shape({
      age: yup.number().notRequired().nullable().integer().min(0),
      latitude: yup.number().notRequired().nullable(),
      longitude: yup.number().notRequired().nullable(),
      monthlyIncome: yup.number().notRequired().nullable().integer().min(0),
      experienced: yup.boolean().notRequired(),
    });

    await schema.validate({ age, latitude, longitude, monthlyIncome, experienced }).catch(function (err) {
      return res.status(422).json({ 'errors': err.errors }).end();
    });

    const params = {};
    const d1d2 = [];
    const sqrtD1 = [];
    const sqrtD2 = [];
    const replacements = {};
    
    if(age){
      d1d2.push(`(${age}* age )`);
      sqrtD1.push(`(${age}* ${age})`);
      sqrtD2.push(`(age * age)`);
      params['age'] = age;
    }

    if(latitude && longitude){
      let latLonQuery = '(111.045 * DEGREES(ACOS(COS(RADIANS(:lat)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(:lon)) + SIN(RADIANS(:lat)) * SIN(RADIANS(latitude)))))';
      sqrtD2.push(`(${latLonQuery}* ${latLonQuery})`);
      replacements['lat'] = latitude;
      replacements['lon'] = longitude;
    }

    if(monthlyIncome){
      d1d2.push(`(${monthlyIncome}* monthlyIncome )`);
      sqrtD1.push(`(${monthlyIncome}* ${monthlyIncome})`);
      sqrtD2.push(`(monthlyIncome * monthlyIncome)`);
      params['monthlyIncome'] = monthlyIncome;
    }

    if(experienced || experienced===0 || experienced==false){
      let exp = ( experienced===0 || experienced==false) ? 0: 1;
      d1d2.push(`(${exp}* experienced )`);
      sqrtD1.push(`(${exp}* ${exp})`);
      sqrtD2.push(`(experienced * experienced)`);
      params['experienced'] = exp;
    }

    var result = null;
    if (d1d2.length==1){
      result = await models.peoples.findAll({
        attributes: { exclude: ['createdAt','updatedAt'] },
        where: params,
        limit
      });
    }else{
      var query = 'select id,name,age, monthlyIncome, experienced ';
      if (d1d2.length > 0) {
        let d1d2Query = d1d2.join("+");
        let sqrtD1Query = sqrtD1.join("+");
        let sqrtD2Query = sqrtD2.join("+");

        query += `,( 
              (${d1d2Query}) / 
              ( (sqrt(${sqrtD1Query})) * ( sqrt(${sqrtD2Query})) ) 
           ) as score`;
      }

      query += ' from peoples';
      if (d1d2.length > 0) {
        query += ' order by score desc';
      }
      query += ` limit ${limit}`;

      result = await models.sequelize.query(query, {
        replacements,
        model: models.peoples,
        mapToModel: true,
        raw: true,
        type: Sequelize.QueryTypes.SELECT
      });
    }
    return res.status(200).json(result);
  }

  async getCompare(req, res, next) {
    const { type,value } = req.query;

    const schema = yup.object().shape({
      type: yup.mixed().required().oneOf(['monthlyIncome','age']),
      value: yup.number().required().integer()
    });

    await schema.validate({ type, value }).catch(function (err) {
      return res.status(422).json({ 'errors': err.errors }).end();
    });

    var result = null;
    var caseQuery = '';
    if(type==='age'){
      caseQuery = `CASE WHEN age > ${value} THEN 'older' WHEN age = ${value} THEN 'same' ELSE 'younger' END`;
    }else if(type =='monthlyIncome'){
      caseQuery = `CASE WHEN monthlyIncome > ${value} THEN 'more' WHEN monthlyIncome = ${value} THEN 'same' ELSE 'lesser' END`;
    }
    if(caseQuery){
      result = await models.peoples.findAll({
        attributes: [
          [models.sequelize.literal(caseQuery), 'category'],
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']
        ],
        group: ['category']
      });
    }
  
    if (result){
      return res.status(200).json(result);
    }
  }
}
module.exports = PeopleController;