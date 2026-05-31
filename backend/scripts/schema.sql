-- Database schema for Sport Store Inventory backend

CREATE TABLE categories (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL
);

CREATE TABLE inventories (
  id serial PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL,
  name text NOT NULL,
  brand text NOT NULL,
  product_model text NOT NULL,
  description text,
  price numeric(12,2) NOT NULL DEFAULT 0,
  offer int NOT NULL DEFAULT 0,
  quantity int NOT NULL DEFAULT 0,
  category_id int NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  search_vector tsvector
);

-- Full-text search support used by the inventory search endpoint.
CREATE INDEX IF NOT EXISTS idx_inventories_search ON inventories USING GIN(search_vector);

CREATE FUNCTION inventories_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    to_tsvector('english', COALESCE(NEW.name, '') || ' ' ||
                             COALESCE(NEW.brand, '') || ' ' ||
                             COALESCE(NEW.product_model, '') || ' ' ||
                             COALESCE(NEW.description, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inventories_search_vector_trigger
BEFORE INSERT OR UPDATE ON inventories
FOR EACH ROW EXECUTE FUNCTION inventories_search_vector_update();
