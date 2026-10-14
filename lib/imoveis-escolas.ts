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
  { codigo: "73571", titulo: "Casa com piscina", tipo: "Casa", bairro: "Saguaçu", rua: "Rua Herval d'Oeste", preco: 1590000, area: 180, dormitorios: 3, suites: 1, vagas: 2, iptu: 753, destaque: "Área gourmet ligada à piscina e suíte com banheira. Mesma rua do Colégio Machado de Assis.", link: "http://v.imo.bi/dGQ5GVihL6D5h", foto: foto("73571"), lat: -26.282585, lng: -48.834565 },
  { codigo: "73140", titulo: "Residencial Santorini", tipo: "Cobertura", bairro: "Anita Garibaldi", rua: "Rua Eugênio Moreira", preco: 1700000, area: 198, dormitorios: 3, suites: 3, vagas: 4, condominio: 1365, iptu: 1858, destaque: "Mobiliada, com piscina privativa, hidromassagem e deck.", link: "http://v.imo.bi/QFAYGVihLbwZX", foto: foto("73140"), lat: -26.320343, lng: -48.847659 },
  { codigo: "73415", titulo: "Condomínio Jardim Algarve", tipo: "Casa em condomínio", bairro: "América", rua: "Rua Padre Anchieta", preco: 1717546, area: 188, dormitorios: 3, suites: 3, vagas: 3, destaque: "Condomínio fechado com apenas quatro residências.", link: "http://v.imo.bi/dtdY7VihLbNR3", foto: foto("73415"), lat: -26.292395, lng: -48.861406 },
  { codigo: "72126", titulo: "Full House América", tipo: "Apartamento", bairro: "América", rua: "Rua Padre Dehon", preco: 1722562, area: 219, dormitorios: 3, suites: 3, vagas: 2, destaque: "Com terraço; rua paralela à João Colin, perto de comércio e escolas.", link: "http://v.imo.bi/wSYmGVihLbpnx", foto: foto("72126"), lat: -26.282916, lng: -48.848477, aproximado: true },
  { codigo: "72829", titulo: "Residencial Vernazza", tipo: "Sobrado", bairro: "Glória", rua: "Rua dos Bandeirantes", preco: 1730000, area: 306, dormitorios: 3, suites: 3, vagas: 4, destaque: "Triplex em condomínio com guarita; hidromassagem e escritório.", link: "http://v.imo.bi/ZH8cTbVihLbwzB", foto: foto("72829"), lat: -26.288691, lng: -48.875512, aproximado: true },
  { codigo: "73775", titulo: "Belmond Residence", tipo: "Apartamento", bairro: "América", rua: "Rua Aracaju", preco: 1780000, area: 185, dormitorios: 3, suites: 3, vagas: 2, condominio: 1080, iptu: 1960, destaque: "Salas integradas e amplas; piscina, espaço fitness e salão de festas.", link: "http://v.imo.bi/ZY69rZVihLbN5x", foto: foto("73775"), lat: -26.276602, lng: -48.851476 },
  { codigo: "73603", titulo: "Infinity Tower", tipo: "Apartamento", bairro: "Glória", rua: "Rua Euzébio de Queiroz", preco: 1650000, area: 223, dormitorios: 4, suites: 4, vagas: 2, condominio: 1710, iptu: 3840, destaque: "Preço reduzido e totalmente mobiliado: quatro suítes, andar alto com sol da tarde e piscina aquecida.", link: "http://v.imo.bi/ZD9AAnVihL6DmP", foto: foto("73603"), lat: -26.305095, lng: -48.861824 },
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
  // Inclusões de outubro/2026
  { codigo: "66686", titulo: "Edifício Helbor Victória", tipo: "Apartamento", bairro: "Centro", rua: "Rua Pastor Fritz Buhler", preco: 1950000, area: 162, dormitorios: 3, suites: 3, vagas: 3, iptu: 2115, destaque: "15º andar, três suítes e sacada integrada com churrasqueira.", link: "http://v.imo.bi/K4V96wVihL6Dv9", foto: foto("66686"), lat: -26.307434, lng: -48.849471 },
  { codigo: "68339", titulo: "Edifício Poema", tipo: "Apartamento", bairro: "América", rua: "Rua Aracaju", preco: 1607906, area: 153, dormitorios: 3, suites: 3, vagas: 2, destaque: "Alto padrão, com ambientes integrados e muito verde ao redor.", link: "http://v.imo.bi/ZYxccKVihL6Dwc", foto: foto("68339"), lat: -26.2775, lng: -48.8552, aproximado: true },
  { codigo: "73710", titulo: "Palazzo de Anthurium · 601", tipo: "Apartamento", bairro: "Centro", rua: "Travessa São José", preco: 1920000, area: 153, dormitorios: 2, suites: 2, vagas: 2, condominio: 1086, iptu: 3534, destaque: "Espaço gourmet com churrasqueira a carvão e escritório. Perto do Santos Anjos.", link: "http://v.imo.bi/ZYxcmaVihL6DzQ", foto: foto("73710"), lat: -26.306457, lng: -48.846413 },
  { codigo: "73597", titulo: "Palazzo de Anthurium · 803", tipo: "Apartamento", bairro: "Centro", rua: "Travessa São José", preco: 1590000, area: 141, dormitorios: 3, suites: 3, vagas: 2, condominio: 937, iptu: 3093, destaque: "Totalmente mobiliado e decorado, com ar central. Perto do Santos Anjos.", link: "http://v.imo.bi/KtWQDKVihL6DHt", foto: foto("73597"), lat: -26.306557, lng: -48.846513 },
  { codigo: "73715", titulo: "Edifício Soul", tipo: "Apartamento", bairro: "Centro", rua: "Rua Conselheiro Mafra", preco: 1795000, area: 139, dormitorios: 3, suites: 3, vagas: 2, condominio: 1018, iptu: 2086, destaque: "Três suítes perto dos shoppings e da Via Gastronômica.", link: "http://v.imo.bi/K4cYD3VihLbpDp", foto: foto("73715"), lat: -26.305465, lng: -48.84931 },
  { codigo: "73101", titulo: "Edifício Basel", tipo: "Apartamento", bairro: "América", rua: "Rua Jaraguá", preco: 1723200, area: 136, dormitorios: 3, suites: 3, vagas: 2, destaque: "Três suítes e sacada com churrasqueira a carvão.", link: "http://v.imo.bi/ZDBHJ3VihLbNqs", foto: foto("73101"), lat: -26.297157, lng: -48.854338 },
  { codigo: "71580", titulo: "Edifício Amaluna", tipo: "Apartamento", bairro: "América", rua: "Rua Otto Boehm", preco: 1816152, area: 142, dormitorios: 3, suites: 3, vagas: 2, destaque: "No ponto mais alto da Otto Boehm, com piscina aquecida.", link: "http://v.imo.bi/wSY8wVihLbpvf", foto: foto("71580"), lat: -26.302022, lng: -48.852945 },
  { codigo: "KAA", titulo: "Edifício Kaá (Laguna)", tipo: "Apartamento na planta", bairro: "Atiradores", rua: "Rua Pernambuco", preco: 2477179, area: 162, dormitorios: 3, suites: 3, vagas: 2, destaque: "Lançamento da Construtora Laguna, torre de 27 pavimentos; entrega prevista para fev/2027. Valor \"a partir de\".", link: "https://www.manhaesimoveis.com.br/imovel/apartamento-no-edificio-kaa-joinville-atiradores-3-quartos-2-garagens-venda-ref-90/", foto: foto("KAA"), lat: -26.309552, lng: -48.854096, aproximado: true },
  { codigo: "CN43489314", titulo: "Apartamento Euzébio de Queirós", tipo: "Apartamento", bairro: "Atiradores", rua: "Rua Euzébio de Queirós", preco: 1790000, area: 164, dormitorios: 3, suites: 3, vagas: 2, condominio: 890, destaque: "Andar alto, de frente, sol da manhã e semimobiliado, perto da Otto Boehm.", link: "https://www.chavesnamao.com.br/imovel/apartamento-a-venda-3-quartos-com-garagem-sc-joinville-atiradores-227m2-RS1790000/id-43489314/", foto: foto("CN43489314"), lat: -26.3035, lng: -48.8585, aproximado: true },
  { codigo: "CN46556121", titulo: "Apartamento Rua Aracaju", tipo: "Apartamento", bairro: "Santo Antônio", rua: "Rua Aracaju", preco: 1720000, area: 167, dormitorios: 3, suites: 3, vagas: 2, condominio: 870, iptu: 2100, destaque: "Vista livre para a Serra do Mar, depósito usado como escritório; a cinco minutos do Bonja.", link: "https://www.chavesnamao.com.br/imovel/apartamento-a-venda-3-quartos-com-garagem-sc-joinville-santo-antonio-185m2-RS1720000/id-46556121/", foto: foto("CN46556121"), lat: -26.276962, lng: -48.853881, aproximado: true },
  { codigo: "73777", titulo: "Edifício Nobilis (cobertura)", tipo: "Cobertura", bairro: "Glória", rua: "Rua Luiz Delfino", preco: 1590000, area: 235, dormitorios: 3, suites: 3, vagas: 3, condominio: 1452, iptu: 2464, destaque: "Cobertura plana com terraço gourmet; piscina e playground.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/cobertura/joinville/gloria/cobertura-em-joinville-gloria-edificio-nobilis-2210/", foto: foto("73777"), lat: -26.294241, lng: -48.866488, aproximado: true },
  { codigo: "73763", titulo: "Edifício Manhattan", tipo: "Apartamento", bairro: "Anita Garibaldi", rua: "Rua Doutor Plácido Gomes", preco: 1700000, area: 240, dormitorios: 3, suites: 3, vagas: 2, condominio: 2621, iptu: 3643, destaque: "Um apartamento por andar; piscina e quadra no condomínio.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/apartamento/joinville/anita-garibaldi/apartamento-em-joinville-anita-garibaldi-edificio-manhattan-2193/", foto: foto("73763"), lat: -26.310492, lng: -48.847851, aproximado: true },
  { codigo: "73516", titulo: "Condomínio Pégasus (cobertura duplex)", tipo: "Cobertura", bairro: "América", rua: "Rua Machado de Assis", preco: 1250000, area: 183, dormitorios: 3, suites: 1, vagas: 2, condominio: 450, iptu: 2311, destaque: "Cobertura duplex com vista e condomínio baixo.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/cobertura/joinville/america/cobertura-em-joinville-america-edificio-pergasus-1970/", foto: foto("73516"), lat: -26.283402, lng: -48.852342, aproximado: true },
  { codigo: "73446", titulo: "Edifício Chamonix", tipo: "Apartamento", bairro: "Centro", rua: "Rua Lages", preco: 950000, area: 190, dormitorios: 3, suites: 2, vagas: 2, condominio: 1754, iptu: 2523, destaque: "Sol da manhã e vista permanente para o verde.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/apartamento/joinville/centro/apartamento-em-joinville-edificio-chamonix-1903/", foto: foto("73446"), lat: -26.296783, lng: -48.850284, aproximado: true },
  { codigo: "73306", titulo: "Edifício Cortina D'Ampezzo", tipo: "Apartamento", bairro: "Centro", rua: "Rua Expedicionário Holz", preco: 1780000, area: 354, dormitorios: 3, suites: 3, vagas: 3, condominio: 2700, destaque: "354 m² privativos para personalizar.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/apartamento/joinville/centro/apartamento-em-joinville-centro-edificio-cortina-d-ampezzo-73306/", foto: foto("73306"), lat: -26.300507, lng: -48.853595, aproximado: true },
  { codigo: "72888", titulo: "Edifício Baumé (cobertura)", tipo: "Cobertura", bairro: "Bom Retiro", rua: "Rua Otto Benack", preco: 1595000, area: 208, dormitorios: 3, suites: 1, vagas: 3, destaque: "Cobertura com 97 m² de terraço e churrasqueira.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/cobertura/joinville/bom-retiro/apartamento-giardino-em-joinville-bom-retiro-residencial-baume-1359/", foto: foto("72888"), lat: -26.265825, lng: -48.84779, aproximado: true },
  { codigo: "72548", titulo: "Edifício Aura (giardino)", tipo: "Apartamento", bairro: "Atiradores", rua: "Rua João Theis", preco: 1650411, area: 182, dormitorios: 2, suites: 2, vagas: 1, destaque: "Giardino com automação residencial.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/apartamento/joinville/atiradores/apartamento-em-joinville-atiradores-edificio-aura-1064/", foto: foto("72548"), lat: -26.303142, lng: -48.85508 },
  { codigo: "57091", titulo: "Edifício Bahamas (outra unidade)", tipo: "Apartamento", bairro: "América", rua: "Rua Itaiópolis", preco: 1100000, area: 191, dormitorios: 4, suites: 4, vagas: 2, condominio: 1760, iptu: 2741, destaque: "Quatro suítes, dois apartamentos por andar.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/apartamento/joinville/america/apartamento-em-america-edificio-bahamas-1248/", foto: foto("57091"), lat: -26.287856, lng: -48.846387 },
  { codigo: "56653", titulo: "Edifício Inspira", tipo: "Apartamento", bairro: "Santo Antônio", rua: "Rua Visconde de Mauá", preco: 1490000, area: 183, dormitorios: 3, suites: 3, vagas: 1, destaque: "Coworking, brinquedoteca e energia solar no condomínio.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/apartamento/joinville/santo-antonio/apartamento-em-joinville-santo-antonio-edificio-inspira/", foto: foto("56653"), lat: -26.276902, lng: -48.854628, aproximado: true },
  { codigo: "45236", titulo: "Torre América (giardino)", tipo: "Apartamento", bairro: "América", rua: "Rua Visconde de Inhaúma", preco: 1620000, area: 191, dormitorios: 3, suites: 3, vagas: 3, destaque: "Só 12 apartamentos, dois por andar.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/apartamento/joinville/america/apartamento-em-joinville-america-edificio-torre-america-2/", foto: foto("45236"), lat: -26.282807, lng: -48.846054, aproximado: true },
  { codigo: "24167", titulo: "Edifício Alessandra (cobertura)", tipo: "Cobertura", bairro: "Anita Garibaldi", rua: "Rua Paraná", preco: 1100000, area: 323, dormitorios: 4, suites: 1, vagas: 3, condominio: 580, iptu: 2211, destaque: "Cobertura de 323 m² com vista e escritório.", link: "https://www.ottohouse.com.br/imovel/imoveis-a-venda/cobertura/joinville/anita-garibaldi/cobertura-em-joinville-anita-garibaldi-edificio-alessandra/", foto: foto("24167"), lat: -26.313471, lng: -48.847771, aproximado: true },
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
