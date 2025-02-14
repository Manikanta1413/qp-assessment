var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from "typeorm";
let Grocery = class Grocery {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Grocery.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Grocery.prototype, "name", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Grocery.prototype, "price", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], Grocery.prototype, "stock", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Grocery.prototype, "createdAt1", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Grocery.prototype, "updatedAt", void 0);
Grocery = __decorate([
    Entity({ name: "groceries" })
], Grocery);
export { Grocery };
