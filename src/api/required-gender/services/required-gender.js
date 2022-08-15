'use strict';

/**
 * required-gender service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::required-gender.required-gender');
