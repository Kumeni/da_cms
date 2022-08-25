'use strict';

/**
 *  room controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::room.room', ({strapi}) => ({
    async find(ctx) {
        // some logic here
        // active referrals, for now lets use 10
        // we'll use the right ones later

        // console.log(ctx.request);
        const { data, meta } = await super.find(ctx);
        // some more logic
        let images, i = 0;

        for( i = 0; i < data.length; i++){
            data[i].attributes.images = await strapi.db.query('api::image.image').findMany({
                    where: {
                        roomId: {
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

            data[i].attributes.roomType = await strapi.db.query('api::room-type.room-type').findOne({
                    where: {
                        id: {
                            $eq: data[i].attributes.roomTypeId,
                        }
                    }
                })
                .then( res => res.name )
                .catch( err => console.log(err));
            
            data[i].attributes.requiredGender = await strapi.db.query('api::required-gender.required-gender').findOne({
                    where: {
                        id: {
                            $eq: data[i].attributes.requiredGenderId,
                        }
                    }
                })
                .then( res => res.gender )
                .catch( err => console.log(err));
        
            data[i].attributes.referrals = 10;

            data[i].attributes.building = await strapi.db.query('api::building.building').findOne({
                where: {
                    id: {
                        $eq: data[i].attributes.buildingId,
                    },
                    deleted: {
                        $eq:false
                    }
                },
            })
            .then( res => res )
            .catch( err => console.log(err));
        }

        return { data, meta };
    },

    async findOne(ctx) {
        // some logic here
        const response = await super.findOne(ctx);
        // some more logic

        response.data.attributes.images = await strapi.db.query('api::image.image').findMany({
            where: {
                roomId: {
                    $eq: response.data.id,
                },
                deleted: {
                    $eq:false
                }
            },
            populate:["image"]
        })
        .then( res => res )
        .catch( err => console.log(err));

        response.data.attributes.roomType = await strapi.db.query('api::room-type.room-type').findOne({
                where: {
                    id: {
                        $eq: response.data.attributes.roomTypeId,
                    }
                }
            })
            .then( res => res.name )
            .catch( err => console.log(err));
    
        response.data.attributes.requiredGender = await strapi.db.query('api::required-gender.required-gender').findOne({
                where: {
                    id: {
                        $eq: response.data.attributes.requiredGenderId,
                    }
                }
            })
            .then( res => res.gender )
            .catch( err => console.log(err));

        response.data.attributes.building = await strapi.db.query('api::building.building').findOne({
            where: {
                id: {
                    $eq: response.data.attributes.buildingId,
                },
                deleted: {
                    $eq:false
                }
            },
        })
        .then( res => res )
        .catch( err => console.log(err));

        response.data.attributes.building.images = await strapi.db.query('api::image.image').findMany({
            where: {
                buildingId: {
                    $eq: response.data.attributes.building.id,
                },
                deleted: {
                    $eq:false
                }
            },
            populate:["image"]
        })
        .then( res => res )
        .catch( err => console.log(err));

        response.data.attributes.hostel = await strapi.db.query('api::hostel.hostel').findOne({
            where: {
                id: {
                    $eq: response.data.attributes.building.hostelId,
                },
                deleted: {
                    $eq:false
                }
            },
        })
        .then( res => res )
        .catch( err => console.log(err));
        
        return response;
      }
}));
