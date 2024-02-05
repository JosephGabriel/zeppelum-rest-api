import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.repo.create(createCategoryDto);

    return this.repo.save(category);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const category = await this.repo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return this.repo.save(category);
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    return this.repo.remove(category);
  }
}
