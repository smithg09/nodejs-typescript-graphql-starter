"use strict";
/**
 * Originally taken from 'w3tecch/express-typescript-boilerplate'
 * Credits to the author
 */
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatch_1 = require("event-dispatch");
const typedi_1 = require("typedi");
function EventDispatcher() {
    return (object, propertyName, index) => {
        const eventDispatcher = new event_dispatch_1.EventDispatcher();
        typedi_1.Container.registerHandler({ object, propertyName, index, value: () => eventDispatcher });
    };
}
exports.EventDispatcher = EventDispatcher;
var event_dispatch_2 = require("event-dispatch");
exports.EventDispatcherInterface = event_dispatch_2.EventDispatcher;
//# sourceMappingURL=eventDispatcher.js.map