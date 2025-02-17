import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this.query.search as string;
    if (search) {
      const searchQuery = {
        $or: searchableFields.map((field) => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      };
      this.modelQuery = this.modelQuery.find(searchQuery as FilterQuery<T>);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedKeys = ['search', 'page', 'limit', 'sortOrder', 'sortBy', 'fields'];
    excludedKeys.forEach((key) => delete queryObj[key]);

    Object.keys(queryObj).forEach((key) => {
      if (queryObj[key]) {
        this.modelQuery = this.modelQuery.find({ [key]: queryObj[key] });
      }
    });

    return this;
  }

  paginate() {
    const page = Math.max(1, Number(this.query.page) || 1);
    const limit = Math.max(1, Number(this.query.limit) || 10);
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  sort() {
    let sortStr = '-createdAt'; // Default sort by newest first
    if (this.query.sortBy) {
      const sortBy = this.query.sortBy as string;
      const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
      sortStr = `${sortOrder}${sortBy}`;
    }

    this.modelQuery = this.modelQuery.sort(sortStr);
    return this;
  }

  select() {
    const fields = this.query.fields
      ? (this.query.fields as string).split(',').join(' ')
      : '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    return await this.modelQuery.clone().countDocuments();
  }
}

export default QueryBuilder;
