"use strict";
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async findMe(ctx) {
    let entities;
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authoriztion header was found" }] },
      ]);
    }
    entities = await strapi.query("detail").find({user:user.id });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.detail })
    );
  },
  async findMeCount(ctx) {
        let entities;
        const user = ctx.state.user;
    
        if (!user) {
          return ctx.badRequest(null, [
            { messages: [{ id: "No authoriztion header was found" }] },
          ]);
        }
        entities = await strapi.query("detail").find({user:user.id });
        return entities.length;
      },
  async createMe(ctx) {
    let entity;

 
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authoriztion header was found" }] },
      ]);
    }
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data['user']=user;
      entity = await strapi.services.detail.create(data, { files });
    } else {
            const data=ctx.request.body;
            data['user']=user;
      entity = await strapi.services.detail.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.detail });
  },
};
