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
exports.HomeVisit = void 0;
const typeorm_1 = require("typeorm");
const healthAgent_entity_1 = require("./healthAgent.entity");
const address_entity_1 = require("./address.entity");
let HomeVisit = class HomeVisit {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], HomeVisit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HomeVisit.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HomeVisit.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], HomeVisit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 500,
        nullable: true
    }),
    __metadata("design:type", String)
], HomeVisit.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => healthAgent_entity_1.Agent, (agent) => agent.id, {
        eager: true
    }),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", healthAgent_entity_1.Agent)
], HomeVisit.prototype, "agent_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => address_entity_1.Address, (address) => address.id, {
        eager: true
    }),
    (0, typeorm_1.JoinColumn)({ name: "address_id" }),
    __metadata("design:type", address_entity_1.Address)
], HomeVisit.prototype, "address_id", void 0);
HomeVisit = __decorate([
    (0, typeorm_1.Entity)()
], HomeVisit);
exports.HomeVisit = HomeVisit;
//# sourceMappingURL=homeVisit.entity.js.map