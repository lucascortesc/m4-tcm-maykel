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
exports.Pacient = void 0;
const typeorm_1 = require("typeorm");
const family_entity_1 = require("./family.entity");
let Pacient = class Pacient {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Pacient.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 11 }),
    __metadata("design:type", String)
], Pacient.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 158,
        nullable: false,
    }),
    __metadata("design:type", String)
], Pacient.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 158,
        nullable: false,
    }),
    __metadata("design:type", String)
], Pacient.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Pacient.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 11,
    }),
    __metadata("design:type", String)
], Pacient.prototype, "tel", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Boolean)
], Pacient.prototype, "is_owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => family_entity_1.Family, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: "family_id" }),
    __metadata("design:type", family_entity_1.Family)
], Pacient.prototype, "family", void 0);
Pacient = __decorate([
    (0, typeorm_1.Entity)("pacient"),
    (0, typeorm_1.Unique)(["cpf"])
], Pacient);
exports.Pacient = Pacient;
//# sourceMappingURL=pacient.entity.js.map