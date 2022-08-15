'use strict';

/**
 *  building controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::building.building', ({strapi}) => ({

    async find(ctx) {
        // some logic here
        // active referrals, for now lets use 10
        // we'll use the right ones later
        const { data, meta } = await super.find(ctx);
        // some more logic
        let images, rooms, i = 0;

        for( i = 0; i < data.length; i++){
            rooms = await strapi.db.query('api::room.room').findMany({
                    where: {
                    buildingId: {
                        $eq: data[i].id,
                    },
                    deleted: {
                        $eq:false
                    }
                    },
                })
                .then( res => res )
                .catch( err => console.log(err));

            images = await strapi.db.query('api::image.image').findMany({
                    where: {
                    buildingId: {
                        $eq: data[i].id,
                    },
                    deleted: {
                        $eq:false
                    }
                    },
                    populate:["image"]
                })
                .then( res => res )
                .catch( err => console.log(err));

            data[i].attributes.rooms = rooms.length;
            data[i].attributes.images = images;
            data[i].attributes.referrals = 10;
        }

        return { data, meta };
    }
}));
