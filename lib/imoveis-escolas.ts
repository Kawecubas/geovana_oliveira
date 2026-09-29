// Dados da página /imoveis-perto-de-escolas
// Coordenadas obtidas no OpenStreetMap (Nominatim) em 29/09/2026.
// "aproximado: true" = o número exato não existe no mapa; o ponto fica na rua.

export type Escola = {
  id: string;
  nome: string;
  unidade?: string;
  endereco: string;
  bairro: string;
  niveis: string;
  enem: number;
  lat: number;
  lng: number;
};

export type Imovel = {
  codigo: string;
  titulo: string;
  tipo: string;
  bairro: string;
  rua: string;
  preco: number;
  area: number; // área privativa (m²)
  dormitorios: number;
  suites: number;
  vagas: number;
  condominio?: number;
  iptu?: number;
  destaque: string;
  link: string;
  foto: string;
  lat: number;
  lng: number;
  aproximado?: boolean;
};

export const escolas: Escola[] = [
  { id: "bonja-medio", nome: "Colégio Bom Jesus IELUSC (Bonja)", unidade: "Ensino Médio", endereco: "R. Princesa Isabel, 438", bairro: "Centro", niveis: "Ensino Médio", enem: 652, lat: -26.299323, lng: -48.846808 },
  { id: "bonja-fund", nome: "Colégio Bom Jesus IELUSC (Bonja)", unidade: "Fundamental", endereco: "R. Mafra, 84", bairro: "Saguaçu", niveis: "4º ao 9º ano", enem: 652, lat: -26.279729, lng: -48.842999 },
  { id: "positivo", nome: "Colégio Positivo Joinville", endereco: "R. Aquidaban, 200", bairro: "Atiradores", niveis: "Infantil ao 2º ano do Médio, bilíngue", enem: 652, lat: -26.305572, lng: -48.858308 },
  { id: "coree", nome: "Coree International School", endereco: "R. Gothard Kaesemodel, 961", bairro: "Anita Garibaldi", niveis: "Infantil ao Médio, programa IB", enem: 650, lat: -26.320462, lng: -48.854019 },
  { id: "santos-anjos", nome: "Colégio dos Santos Anjos", endereco: "Av. Juscelino Kubitschek, 440", bairro: "Centro", niveis: "Infantil ao Médio", enem: 645, lat: -26.305582, lng: -48.846745 },
  { id: "exathum", nome: "Exathum Curso e Colégio", endereco: "R. Presidente Prudente de Moraes, 406", bairro: "Santo Antônio", niveis: "Fundamental ao Médio", enem: 609, lat: -26.274204, lng: -48.853865 },
  { id: "adventista", nome: "Colégio Adventista de Joinville", endereco: "R. Casemiro de Abreu, 100", bairro: "Saguaçu", niveis: "Infantil ao pré-vestibular", enem: 608, lat: -26.284334, lng: -48.842377 },
  { id: "santo-antonio", nome: "Colégio Santo Antônio", endereco: "R. Papa João XXIII, 1100", bairro: "Iririú", niveis: "Infantil ao Médio", enem: 604, lat: -26.276522, lng: -48.823042 },
  { id: "machado", nome: "Colégio Católica Machado de Assis", endereco: "R. Herval d'Oeste, 335", bairro: "Saguaçu", niveis: "Com Ensino Médio", enem: 602, lat: -26.283075, lng: -48.835103 },
  { id: "univille", nome: "Colégio Univille", endereco: "R. Paulo Malschitzki, 10", bairro: "Zona Industrial Norte", niveis: "Infantil ao Médio", enem: 597, lat: -26.2517, lng: -48.856148 },
  { id: "conexao", nome: "Colégio Conexão", endereco: "R. Dona Francisca, 910", bairro: "Saguaçu", niveis: "Infantil ao Médio", enem: 596, lat: -26.293594, lng: -48.8416 },
];

const foto = (codigo: string) => `/imoveis-escolas/${codigo}.jpg`;

export const imoveis: Imovel[] = [
  { codigo: "72756", titulo: "Edifício Bahamas", tipo: "Apartamento", bairro: "América", rua: "Rua Itaiópolis", preco: 1200000, area: 191, dormitorios: 4, suites: 3, vagas: 3, condominio: 1800, iptu: 3560, destaque: "Dois apartamentos por andar, ventilação cruzada, reformado e semimobiliado.", link: "http://v.imo.bi/wSYzkVihLbvRT", foto: foto("72756"), lat: -26.287756, lng: -48.846287 },
  { codigo: "73571", titulo: "Casa com piscina", tipo: "Casa", bairro: "Saguaçu", rua: "Rua Herval d'Oeste", preco: 1590000, area: 180, dormitorios: 3, suites: 1, vagas: 2, iptu: 753, destaque: "Área gourmet ligada à piscina e suíte com banheira. Mesma rua do Colégio Machado de Assis.", link: "http://v.imo.bi/QFAAMVihLbNaL", foto: foto("73571"), lat: -26.282585, lng: -48.834565 },
  { codigo: "73140", titulo: "Residencial Santorini", tipo: "Cobertura", bairro: "Anita Garibaldi", rua: "Rua Eugênio Moreira", preco: 1700000, area: 198, dormitorios: 3, suites: 3, vagas: 4, condominio: 1365, iptu: 1858, destaque: "Mobiliada, com piscina privativa, hidromassagem e deck.", link: "http://v.imo.bi/QFAYGVihLbwZX", foto: foto("73140"), lat: -26.320343, lng: -48.847659 },
  { codigo: "73415", titulo: "Condomínio Jardim Algarve", tipo: "Casa em condomínio", bairro: "América", rua: "Rua Padre Anchieta", preco: 1717546, area: 188, dormitorios: 3, suites: 3, vagas: 3, destaque: "Condomínio fechado com apenas quatro residências.", link: "http://v.imo.bi/dtdY7VihLbNR3", foto: foto("73415"), lat: -26.292395, lng: -48.861406 },
  { codigo: "72126", titulo: "Full House América", tipo: "Apartamento", bairro: "América", rua: "Rua Padre Dehon", preco: 1722562, area: 219, dormitorios: 3, suites: 3, vagas: 2, destaque: "Com terraço; rua paralela à João Colin, perto de comércio e escolas.", link: "http://v.imo.bi/wSYmGVihLbpnx", foto: foto("72126"), lat: -26.282916, lng: -48.848477, aproximado: true },
  { codigo: "72829", titulo: "Residencial Vernazza", tipo: "Sobrado", bairro: "Glória", rua: "Rua dos Bandeirantes", preco: 1730000, area: 306, dormitorios: 3, suites: 3, vagas: 4, destaque: "Triplex em condomínio com guarita; hidromassagem e escritório.", link: "http://v.imo.bi/ZH8cTbVihLbwzB", foto: foto("72829"), lat: -26.288691, lng: -48.875512, aproximado: true },
  { codigo: "73775", titulo: "Belmond Residence", tipo: "Apartamento", bairro: "América", rua: "Rua Aracaju", preco: 1780000, area: 185, dormitorios: 3, suites: 3, vagas: 2, condominio: 1080, iptu: 1960, destaque: "Salas integradas e amplas; piscina, espaço fitness e salão de festas.", link: "http://v.imo.bi/ZY69rZVihLbN5x", foto: foto("73775"), lat: -26.276602, lng: -48.851476 },
  { codigo: "73603", titulo: "Infinity Tower", tipo: "Apartamento", bairro: "Glória", rua: "Rua Euzébio de Queiroz", preco: 1780000, area: 223, dormitorios: 4, suites: 4, vagas: 2, condominio: 1710, iptu: 3840, destaque: "Quatro suítes, andar alto com sol da tarde, piscina aquecida e portaria 24h.", link: "http://v.imo.bi/KJbQM6VihLbp2r", foto: foto("73603"), lat: -26.305095, lng: -48.861824 },
  { codigo: "72770", titulo: "Casa Bom Retiro", tipo: "Casa", bairro: "Bom Retiro", rua: "Rua Abraão Lincoln", preco: 1950000, area: 300, dormitorios: 4, suites: 1, vagas: 4, iptu: 1906, destaque: "360 m² construídos em área tranquila; adega, deck e escritório.", link: "http://v.imo.bi/dt29JVihLbwWP", foto: foto("72770"), lat: -26.254735, lng: -48.844294 },
  { codigo: "72397", titulo: "Residencial Lyon", tipo: "Sobrado", bairro: "América", rua: "Rua Visconde de Mauá", preco: 1980000, area: 240, dormitorios: 3, suites: 1, vagas: 2, destaque: "Área residencial alta, onde o zoneamento não permite prédios acima de 9 m.", link: "http://v.imo.bi/K4cYFLVihLbv6P", foto: foto("72397"), lat: -26.288193, lng: -48.855256, aproximado: true },
  { codigo: "71406", titulo: "Residencial The Ivy", tipo: "Casa", bairro: "América", rua: "Rua Quintino Bocaiúva", preco: 1980000, area: 285, dormitorios: 3, suites: 3, vagas: 3, destaque: "Geminado com elevador e adega, em rua arborizada e tranquila.", link: "http://v.imo.bi/dt2KkVihLbppW", foto: foto("71406"), lat: -26.290454, lng: -48.8528 },
  { codigo: "72196", titulo: "Maison Soleil", tipo: "Cobertura", bairro: "Atiradores", rua: "Rua Visconde de Taunay", preco: 2000000, area: 206, dormitorios: 2, suites: 2, vagas: 2, condominio: 828, iptu: 1922, destaque: "Cobertura plana com faces leste, norte e sul; vista da cidade, deck e adega.", link: "http://v.imo.bi/QFAGzVihLbvqt", foto: foto("72196"), lat: -26.308597, lng: -48.854859 },
  { codigo: "73776", titulo: "Casa São Marcos", tipo: "Casa", bairro: "São Marcos", rua: "Rua das Hortências", preco: 2000000, area: 280, dormitorios: 5, suites: 1, vagas: 2, iptu: 2182, destaque: "Ambientes amplos, lareira, hidromassagem e cozinha planejada.", link: "http://v.imo.bi/Kty25dVihLbps2", foto: foto("73776"), lat: -26.316145, lng: -48.880142 },
  { codigo: "72562", titulo: "Edifício Icon", tipo: "Apartamento", bairro: "Centro", rua: "Rua Conselheiro Mafra", preco: 2284000, area: 183, dormitorios: 3, suites: 3, vagas: 2, destaque: "Arquitetura contemporânea, suíte master e living integrado; piscina, fitness e brinquedoteca.", link: "http://v.imo.bi/QXyKnVihLdD87", foto: foto("72562"), lat: -26.305643, lng: -48.849458 },
  { codigo: "72956", titulo: "Edifício Ópera · 1002", tipo: "Apartamento", bairro: "Atiradores", rua: "Rua Leopoldo Fischer", preco: 2400000, area: 200, dormitorios: 3, suites: 3, vagas: 2, destaque: "Isolamento acústico entre apartamentos; piscina aquecida, quadra e rooftop. Ao lado do Positivo.", link: "http://v.imo.bi/KJjbKPVihLdDpk", foto: foto("72956"), lat: -26.306782, lng: -48.858286 },
  { codigo: "73701", titulo: "Edifício Ópera · 1502", tipo: "Apartamento", bairro: "Atiradores", rua: "Rua Leopoldo Fischer", preco: 2650000, area: 200, dormitorios: 3, suites: 3, vagas: 3, condominio: 1585, destaque: "Andar alto, duas unidades por andar, vista para a cidade e a Baía da Babitonga.", link: "http://v.imo.bi/ZH5KkrVihLdDpJ", foto: foto("73701"), lat: -26.306682, lng: -48.858136 },
  { codigo: "72702", titulo: "Helbor Magnifique", tipo: "Apartamento", bairro: "Anita Garibaldi", rua: "Travessa São José", preco: 2650000, area: 232, dormitorios: 3, suites: 3, vagas: 3, condominio: 2000, iptu: 3919, destaque: "Finamente mobiliado: suíte master com banheira e closet, lareira e ilha gourmet.", link: "http://v.imo.bi/ZH5KrhVihLdDwM", foto: foto("72702"), lat: -26.306414, lng: -48.847172 },
  { codigo: "73736", titulo: "Edifício Ópera · 1102", tipo: "Apartamento", bairro: "Atiradores", rua: "Rua Leopoldo Fischer", preco: 2700000, area: 200, dormitorios: 3, suites: 3, vagas: 2, condominio: 1600, iptu: 2772, destaque: "Pronto para morar, vista panorâmica e sacada com churrasqueira.", link: "http://v.imo.bi/KJjbKbVihLdDv3", foto: foto("73736"), lat: -26.306882, lng: -48.858436 },
  { codigo: "73693", titulo: "Edifício Saint Antoní", tipo: "Apartamento", bairro: "Santo Antônio", rua: "Rua Marcílio Dias", preco: 2780000, area: 172, dormitorios: 3, suites: 3, vagas: 3, condominio: 1120, iptu: 2693, destaque: "Novo, porteira fechada: mobiliado, com eletrodomésticos e marcenaria. 230 m² de área total.", link: "http://v.imo.bi/KtzNb2VihLdDgC", foto: foto("73693"), lat: -26.275276, lng: -48.851798 },
  { codigo: "27812", titulo: "Oslo House", tipo: "Apartamento", bairro: "América", rua: "Rua Aracaju", preco: 3021710, area: 189, dormitorios: 3, suites: 3, vagas: 2, destaque: "Hall com pé-direito duplo e estilo clássico-contemporâneo; piscina e playground.", link: "http://v.imo.bi/ZDBxDAVihLdDXk", foto: foto("27812"), lat: -26.276685, lng: -48.853724 },
  { codigo: "71509", titulo: "Alameda América", tipo: "Apartamento", bairro: "América", rua: "Rua Aracaju", preco: 3199000, area: 259, dormitorios: 4, suites: 4, vagas: 3, destaque: "Elevador privativo, adega, escritório e sacada gourmet; piscina aquecida.", link: "http://v.imo.bi/K44VMWVihLdDFP", foto: foto("71509"), lat: -26.27664, lng: -48.8526, aproximado: true },
];

// Distância em linha reta (metros)
export function distanciaMetros(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371000;
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
