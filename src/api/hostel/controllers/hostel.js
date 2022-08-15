'use strict';

/**
 *  hostel controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::hostel.hostel', ({strapi}) => ({
    async find(ctx) {
        // some logic here
        // active referrals, for now lets use 10
        // we'll use the right ones later
        const { data, meta } = await super.find(ctx);
        // some more logic
        let buildings, i = 0;

        for( i = 0; i < data.length; i++){
            buildings = await strapi.db.query('api::building.building').findMany({
                where: {
                  hostelId: {
                    $eq: data[i].id,
                  },
                  deleted: {
                    $eq:false
                  }
                },
              })
              .then( res => res )
              .catch( err => console.log(err));
            
            data[i].attributes.buildings = buildings.length;
            data[i].attributes.referrals = 10;
        }

        return { data, meta };
    }
}));
