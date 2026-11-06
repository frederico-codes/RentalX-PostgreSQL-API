import { getConnection, getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";


interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

constructor() {
  console.log("1. Iniciando CategoriesRepository");

  const connection = getConnection();

  console.log("2. Conexão:", connection.name);
  console.log("3. Conectado:", connection.isConnected);

  console.log(
    "4. Entidades registradas:",
    connection.entityMetadatas.map((entity) => entity.name)
  );

  console.log(
    "5. Category registrada:",
    connection.hasMetadata(Category)
  );

  this.repository = getRepository(Category);

  console.log("6. Repositório criado com sucesso!");
}

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = await this.repository.findOne({ name });

    return category;
  }
}

export { CategoriesRepository };
