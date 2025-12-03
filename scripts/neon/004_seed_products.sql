-- Seed initial products for DonaS
INSERT INTO products (name, price, image_url, description, category)
VALUES 
  ('Vestido Elegante', 120.00, '/placeholder.svg?height=400&width=300', 'Vestido elegante perfeito para ocasiões especiais', 'Vestidos'),
  ('Saia Jeans', 80.00, '/placeholder.svg?height=400&width=300', 'Saia jeans versátil para o dia a dia', 'Saias'),
  ('Vestido Casual', 95.00, '/placeholder.svg?height=400&width=300', 'Vestido casual confortável e moderno', 'Vestidos'),
  ('Saia Midi', 110.00, '/placeholder.svg?height=400&width=300', 'Saia midi elegante e sofisticada', 'Saias'),
  ('Vestido Longo', 180.00, '/placeholder.svg?height=400&width=300', 'Vestido longo para eventos especiais', 'Vestidos'),
  ('Short Saia', 75.00, '/placeholder.svg?height=400&width=300', 'Short saia prático e estiloso', 'Shorts'),
  ('Conjunto Cropped', 150.00, '/placeholder.svg?height=400&width=300', 'Conjunto cropped moderno e sensual', 'Conjuntos'),
  ('Calça Pantalona', 130.00, '/placeholder.svg?height=400&width=300', 'Calça pantalona elegante e confortável', 'Calças'),
  ('Blusa Ciganinha', 65.00, '/placeholder.svg?height=400&width=300', 'Blusa ciganinha romântica e delicada', 'Blusas'),
  ('Saia Lápis', 90.00, '/placeholder.svg?height=400&width=300', 'Saia lápis clássica e versátil', 'Saias'),
  ('Macaquinho', 145.00, '/placeholder.svg?height=400&width=300', 'Macaquinho moderno e prático', 'Macacões'),
  ('Vestido Curto', 105.00, '/placeholder.svg?height=400&width=300', 'Vestido curto perfeito para o verão', 'Vestidos')
ON CONFLICT DO NOTHING;
