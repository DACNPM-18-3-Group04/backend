const { Property } = require('../../../models');

const updateProperty =  async(paramsUpdate,queryUpdate)=>{
    return Property.update(paramsUpdate,queryUpdate)
}

module.exports = updateProperty;
