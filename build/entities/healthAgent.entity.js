"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
let Agent = class Agent {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Agent.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 158 }),
    __metadata("design:type", String)
], Agent.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 158 }),
    __metadata("design:type", String)
], Agent.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Agent.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Agent.prototype, "isactive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_entity_1.Address, (Address) => Address.agent),
    __metadata("design:type", Array)
], Agent.prototype, "address", void 0);
Agent = __decorate([
    (0, typeorm_1.Entity)("agents"),
    (0, typeorm_1.Unique)(["email"])
], Agent);
exports.Agent = Agent;
//# sourceMappingURL=healthAgent.entity.js.map