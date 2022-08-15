'use strict';

/**
 * mpesa-payment service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mpesa-payment.mpesa-payment');
