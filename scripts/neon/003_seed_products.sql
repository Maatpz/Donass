-- Insert initial products
INSERT INTO products (name, description, price, image_url) VALUES
  ('Vestido Elegante', 'Vestido elegante perfeito para ocasiões especiais', 120.00, '/placeholder.svg?height=400&width=300'),
  ('Saia Jeans', 'Saia jeans moderna e versátil', 80.00, '/placeholder.svg?height=400&width=300'),
  ('Vestido Casual', 'Vestido casual para o dia a dia', 95.00, '/placeholder.svg?height=400&width=300'),
  ('Saia Midi', 'Saia midi sofisticada', 110.00, '/placeholder.svg?height=400&width=300'),
  ('Vestido Longo', 'Vestido longo para eventos especiais', 180.00, '/placeholder.svg?height=400&width=300'),
  ('Short Saia', 'Short saia confortável e estiloso', 75.00, '/placeholder.svg?height=400&width=300'),
  ('Conjunto Cropped', 'Conjunto cropped moderno', 150.00, '/placeholder.svg?height=400&width=300'),
  ('Calça Pantalona', 'Calça pantalona elegante', 130.00, '/placeholder.svg?height=400&width=300'),
  ('Blusa Ciganinha', 'Blusa ciganinha romântica', 65.00, '/placeholder.svg?height=400&width=300'),
  ('Saia Lápis', 'Saia lápis clássica', 90.00, '/placeholder.svg?height=400&width=300'),
  ('Macaquinho', 'Macaquinho versátil e confortável', 145.00, '/placeholder.svg?height=400&width=300'),
  ('Vestido Curto', 'Vestido curto para diversas ocasiões', 105.00, '/placeholder.svg?height=400&width=300')
ON CONFLICT DO NOTHING;
