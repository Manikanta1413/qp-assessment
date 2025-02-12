var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppDataSource } from "../config/database";
import { Grocery } from "../entities/Grocery";
import { AppError } from "../utils/AppError";
import Redis from "ioredis";
export class AdminService {
    constructor() {
        this.groceryRepository = AppDataSource.getRepository(Grocery);
        this.redisClient = new Redis();
    }
    addGrocery(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                if (!data.name || !data.price) {
                    throw new AppError("Name and price are required", 400);
                }
                const grocery = transactionalEntityManager.create(Grocery, data);
                const savedGrocery = yield transactionalEntityManager.save(grocery);
                // Invalidate Cache
                yield this.redisClient.del("groceries_cache");
                return savedGrocery;
            }));
        });
    }
    updateGrocery(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const grocery = yield transactionalEntityManager.findOne(Grocery, {
                    where: { id },
                });
                if (!grocery)
                    throw new AppError("Grocery not found", 404);
                Object.assign(grocery, data);
                const updatedGrocery = yield transactionalEntityManager.save(grocery);
                // Invalidate Cache
                yield this.redisClient.del("groceries_cache");
                return updatedGrocery;
            }));
        });
    }
    deleteGrocery(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                const grocery = yield transactionalEntityManager.findOne(Grocery, {
                    where: { id },
                });
                if (!grocery)
                    throw new AppError("Grocery not found", 404);
                yield transactionalEntityManager.remove(grocery);
                // Invalidate Cache
                yield this.redisClient.del("groceries_cache");
            }));
        });
    }
    getGroceries(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page < 1 || limit < 1) {
                throw new AppError("Page and limit must be greater than 0", 400);
            }
            const cacheKey = `groceries_page_${page}_limit_${limit}`;
            const cachedData = yield this.redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
            const groceries = yield this.groceryRepository.find({
                skip: (page - 1) * limit,
                take: limit,
            });
            // Store in Cache
            yield this.redisClient.setex(cacheKey, 3600, JSON.stringify(groceries));
            return groceries;
        });
    }
}
