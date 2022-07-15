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
exports.Family = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const address_entity_1 = require("./address.entity");
let Family = class Family {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Family.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 100,
        nullable: false,
    }),
    __metadata("design:type", String)
], Family.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => address_entity_1.Address, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "address_id" }),
    __metadata("design:type", address_entity_1.Address)
], Family.prototype, "address", void 0);
Family = __decorate([
    (0, typeorm_1.Entity)("family"),
    __metadata("design:paramtypes", [])
], Family);
exports.Family = Family;
//# sourceMappingURL=family.entity.js.map