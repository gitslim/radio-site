/**
 * Данные об оборудовании
 * Equipment data
 */

import type { Equipment } from './equipment';

/**
 * Список оборудования компании
 * Company equipment list
 */
export const equipmentData: Equipment[] = [
	{
		'id': 'svetobazy',
		'name': 'Светобазы, свет и грип',
		'slug': 'svetobazy',
		'category': 'Светобазы и генераторы',
		'description': 'Полный комплект света и светового грипа',
		'specifications': [
			{
				'label': 'Постоянные осветительные приборы',
				'value': ''
			},
			{
				'label': 'Импульсные осветительные приборы',
				'value': ''
			},
			{
				'label': 'Отражатели , рефлекторы и насадки',
				'value': ''
			},
			{
				'label': 'Стойки и крепления',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/svetobazy/fce28b00-5d9b-4076-9d17-5ce5c88d361a.webp',
			'/images/equipment/svetobazy/e753ae57-bd52-4c4d-a126-a9a417853fa0.webp',
			'/images/equipment/svetobazy/b638e388-0743-4a11-b0f6-1b48c89d2212.webp'
		],
		'available': true,
		'featured': true
	},
	{
		'id': 'generator-atlas-copco-qas-40',
		'name': 'Генератор Atlas Copco QAS-40',
		'slug': 'generator-atlas-copco-qas-40',
		'category': 'Светобазы и генераторы',
		'description': 'Генератор 30 кВт',
		'specifications': [
			{
				'label': 'Напряжение',
				'value': '400 В'
			},
			{
				'label': ' Мощность при постоянной нагрузке (PRP) при 50 Гц',
				'value': '41,1 кВА / 32,9 кВт'
			},
			{
				'label': 'Номинальный ток при постоянной нагрузке',
				'value': '59,3 А'
			},
			{
				'label': 'Размер',
				'value': '2097хх950х1103 мм'
			}
		],
		'images': [
			'/images/equipment/generator-atlas-copco-qas-40/13090a71-3836-42d7-bbfd-d10349302d16.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'generator-atlas-copco-qas-125',
		'name': 'Генератор Atlas Copco QAS-125',
		'slug': 'generator-atlas-copco-qas-125',
		'category': 'Светобазы и генераторы',
		'description': 'Генератор 100 кВт',
		'specifications': [
			{
				'label': 'Напряжение',
				'value': '400 В'
			},
			{
				'label': 'Мощность при постоянной нагрузке (PRP) при 50 Гц',
				'value': '125 кВА / 100 кВт'
			},
			{
				'label': 'Номинальный ток при постоянной нагрузке',
				'value': '180,4 А'
			},
			{
				'label': 'Размер',
				'value': '3378х1180х1618 мм'
			}
		],
		'images': [
			'/images/equipment/generator-atlas-copco-qas-125/934e79b0-746e-4c61-a84d-17ff50f1d07f.webp',
			'/images/equipment/generator-atlas-copco-qas-125/34996f61-6cc5-40ec-a04e-bfa52412dca1.webp',
			'/images/equipment/generator-atlas-copco-qas-125/892b1e7e-0ce3-4a3d-aaf2-dc7981892ac4.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'grimerno-kostyumernyj-kompleks',
		'name': 'Гримерно-костюмерный комплекс',
		'slug': 'grimerno-kostyumernyj-kompleks',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'С двумя гримерными комнатами и комнатой отдыха',
		'specifications': [
			{
				'label': 'Комната отдыха',
				'value': ''
			},
			{
				'label': 'Два гримерных места',
				'value': ''
			},
			{
				'label': 'Возможность отдельного входа в костюмерную',
				'value': ''
			},
			{
				'label': 'Костюмерные рейлы',
				'value': ''
			},
			{
				'label': 'Диван, стол для работы с документами',
				'value': ''
			},
			{
				'label': 'Туалет, душ',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/grimerno-kostyumernyj-kompleks/6f40f50b-e6b9-48e7-b098-6fcf177475b5.webp',
			'/images/equipment/grimerno-kostyumernyj-kompleks/5c5466fc-a9e8-4699-9d49-63aba2ba208c.webp',
			'/images/equipment/grimerno-kostyumernyj-kompleks/6a0509c4-0bdc-4c8f-b3fb-f6914aee3646.webp',
			'/images/equipment/grimerno-kostyumernyj-kompleks/acd9dc95-c47f-4017-a098-6b5dd1e7a9e7.webp',
			'/images/equipment/grimerno-kostyumernyj-kompleks/1dd4fdd2-d226-41e9-b5e2-37984f2b6527.webp'
		],
		'available': true,
		'featured': true
	},
	{
		'id': 'paz-shtab-grimernaya-akterka-kostyumernaya',
		'name': 'ПАЗ штаб-гримерная-актерка-костюмерная',
		'slug': 'paz-shtab-grimernaya-akterka-kostyumernaya',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'Универсальный гримерно-костюмерный комплекс',
		'specifications': [
			{
				'label': 'Гримерное место',
				'value': ''
			},
			{
				'label': 'Комната отдыха',
				'value': ''
			},
			{
				'label': 'Диван',
				'value': ''
			},
			{
				'label': 'Стол для работы с документами',
				'value': ''
			},
			{
				'label': 'Туалет',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/paz-shtab-grimernaya-akterka-kostyumernaya/10a256e7-cbdb-47a9-bfdf-127c4814621f.webp',
			'/images/equipment/paz-shtab-grimernaya-akterka-kostyumernaya/121ab441-c0d2-4b02-afb3-b7cce4a8aaf1.webp',
			'/images/equipment/paz-shtab-grimernaya-akterka-kostyumernaya/fcfd1100-8813-42cc-8b98-1b3ecf9d2d66.webp',
			'/images/equipment/paz-shtab-grimernaya-akterka-kostyumernaya/864af023-dd71-4efc-84ea-3bdb09089eaf.webp',
			'/images/equipment/paz-shtab-grimernaya-akterka-kostyumernaya/35953ff1-d9a8-46b9-a54f-c8047f58c3aa.webp',
			'/images/equipment/paz-shtab-grimernaya-akterka-kostyumernaya/9d7410dd-554c-489a-bfdd-1bd8e57bf2fa.webp',
			'/images/equipment/paz-shtab-grimernaya-akterka-kostyumernaya/a0f0f3f9-9bfe-40ce-9af2-39cd5fee9164.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'paz-4x4-shtab-grimernaya-akterka-kostyumernaya',
		'name': 'ПАЗ 4x4 штаб-гримерная-актерка-костюмерная',
		'slug': 'paz-4x4-shtab-grimernaya-akterka-kostyumernaya',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'Полноприводный с повышенной проходимостью',
		'specifications': [
			{
				'label': 'Комната отдыха',
				'value': ''
			},
			{
				'label': 'Диван',
				'value': ''
			},
			{
				'label': 'Стол для работы с документами',
				'value': ''
			},
			{
				'label': 'Туалет',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/paz-4x4-shtab-grimernaya-akterka-kostyumernaya/43d73fa5-3284-43a1-b62e-95af5a0e22c3.webp',
			'/images/equipment/paz-4x4-shtab-grimernaya-akterka-kostyumernaya/55c86ac2-9fc9-4534-9361-7d216ad6e3b8.webp',
			'/images/equipment/paz-4x4-shtab-grimernaya-akterka-kostyumernaya/48b28c03-6267-404f-89ba-21d675ec0605.webp',
			'/images/equipment/paz-4x4-shtab-grimernaya-akterka-kostyumernaya/24dcdeb4-bcff-4eeb-b2d2-0dcc57ad1c45.webp',
			'/images/equipment/paz-4x4-shtab-grimernaya-akterka-kostyumernaya/c0664b2a-657b-4bd5-9c68-70fe8232f1ef.webp',
			'/images/equipment/paz-4x4-shtab-grimernaya-akterka-kostyumernaya/49dc33ee-65b4-4d1a-8a66-d01e9c2e18f1.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'paz-vip-akterka',
		'name': 'ПАЗ VIP-актерка',
		'slug': 'paz-vip-akterka',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'Повышенной комфортности',
		'specifications': [
			{
				'label': 'Комната отдыха',
				'value': ''
			},
			{
				'label': 'Кухня',
				'value': ''
			},
			{
				'label': 'Стол для работы с документами',
				'value': ''
			},
			{
				'label': 'Кровать',
				'value': ''
			},
			{
				'label': 'Туалет',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/paz-vip-akterka/98e2e1ed-668f-4838-8540-9973c4f7743d.webp',
			'/images/equipment/paz-vip-akterka/259fd31e-b82c-4a4a-88f8-ea7eaf62b8af.webp',
			'/images/equipment/paz-vip-akterka/790a7744-40de-4f7f-adb1-e475c54983ec.webp',
			'/images/equipment/paz-vip-akterka/b73d476a-1fa8-49a1-85c2-481a84a23b45.webp',
			'/images/equipment/paz-vip-akterka/69040df5-bdab-4e22-8eea-4ab52409ea75.webp',
			'/images/equipment/paz-vip-akterka/35c04e59-2d8c-4244-8f08-3d505b591c05.webp',
			'/images/equipment/paz-vip-akterka/8540a715-eb94-4a09-8ed0-0f853abd6f91.webp',
			'/images/equipment/paz-vip-akterka/aee37bf3-62aa-4611-ab3b-e0c5f3c4ba65.webp',
			'/images/equipment/paz-vip-akterka/99606306-0d06-448d-a246-a6b2334080c3.webp',
			'/images/equipment/paz-vip-akterka/6d8c213f-cd3b-4579-a250-993ce726df11.webp',
			'/images/equipment/paz-vip-akterka/dfc1bdf4-e67c-459f-a5c3-430c7ecdd9fe.webp',
			'/images/equipment/paz-vip-akterka/7dd697ba-54d5-4e2b-9b2c-ee105f4df25d.webp',
			'/images/equipment/paz-vip-akterka/fc9174df-1aaf-4a03-8296-fa53512d8f87.webp',
			'/images/equipment/paz-vip-akterka/4c1f2426-1184-447d-849b-96d95c4fb752.webp',
			'/images/equipment/paz-vip-akterka/259b7600-0022-4468-86f5-73128d794dc7.webp',
			'/images/equipment/paz-vip-akterka/512c4c46-3c92-45df-ab97-fa7efdf3f672.webp',
			'/images/equipment/paz-vip-akterka/b488ebe9-cacb-4e9f-b84c-97a1b9625c55.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'akterka-pritsep-avtodom',
		'name': 'Актерка прицеп-автодом',
		'slug': 'akterka-pritsep-avtodom',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'Рассчитан на 1-5 актеров',
		'specifications': [
			{
				'label': 'Стационарная кровать',
				'value': ''
			},
			{
				'label': 'Дополнительная двухъярусная кровать',
				'value': ''
			},
			{
				'label': 'Кухня',
				'value': ''
			},
			{
				'label': 'Отопление',
				'value': ''
			},
			{
				'label': 'Свободный въезд в центр',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/akterka-pritsep-avtodom/cfa7d589-fcd9-40ae-91ac-26566a59e3b0.webp',
			'/images/equipment/akterka-pritsep-avtodom/17376a51-ab15-43a8-b9bd-d28efcd52232.webp',
			'/images/equipment/akterka-pritsep-avtodom/58ff6516-8043-4cd8-a295-49c3a62cae84.webp',
			'/images/equipment/akterka-pritsep-avtodom/680ef48a-5f13-4375-b045-0eddd1cd1a1d.webp',
			'/images/equipment/akterka-pritsep-avtodom/36396bc6-bea8-44ae-a1c0-2220e539e31a.webp',
			'/images/equipment/akterka-pritsep-avtodom/ea1e75ce-5154-4803-af34-3f1b46a54e43.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'shtab-na-kolesah',
		'name': 'Штаб на колесах',
		'slug': 'shtab-na-kolesah',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'Удобный и функциональный',
		'specifications': [
			{
				'label': 'Кожаный салон',
				'value': ''
			},
			{
				'label': 'Диван',
				'value': ''
			},
			{
				'label': 'Кресло и рабочий стол',
				'value': ''
			},
			{
				'label': 'Кофеварка, чайник',
				'value': ''
			},
			{
				'label': 'Вода',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/shtab-na-kolesah/b6ec21e1-7247-41f5-8d0c-7a3381496b0e.webp',
			'/images/equipment/shtab-na-kolesah/7e4ccad5-8607-4137-a198-30d2032f7e96.webp',
			'/images/equipment/shtab-na-kolesah/f4c358bd-8298-4f5a-ba26-11268779a2bb.webp',
			'/images/equipment/shtab-na-kolesah/0b780d3b-387f-462f-8ea4-daac41e4bc24.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'pritsep-tualet',
		'name': 'Прицеп-туалет',
		'slug': 'pritsep-tualet',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'С горячей водой и отоплением',
		'specifications': [
			{
				'label': 'Горячая вода',
				'value': ''
			},
			{
				'label': 'Отопление',
				'value': ''
			},
			{
				'label': 'Зеркало',
				'value': ''
			},
			{
				'label': 'Свет',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/pritsep-tualet/bdb8f793-465c-4d01-b853-c143258397e2.webp',
			'/images/equipment/pritsep-tualet/8398874a-5b5d-4cf2-a658-89e2e06e5a7e.webp',
			'/images/equipment/pritsep-tualet/a4d6c077-ecce-4230-9064-8d544f692119.webp',
			'/images/equipment/pritsep-tualet/aeab6a2f-1ddb-4e66-aab5-f94fe115d798.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'kamervagen-ford-transit',
		'name': 'Камерваген Ford Transit',
		'slug': 'kamervagen-ford-transit',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'Фургон с кабиной на 2 человека и свободным въездом в центр',
		'specifications': [
			{
				'label': 'Фургон длиной 4834 мм',
				'value': ''
			},
			{
				'label': 'Кабина на два пассажира',
				'value': ''
			},
			{
				'label': 'Грузовой отсек длиной 2567 мм',
				'value': ''
			},
			{
				'label': 'Свободный въезд в центр',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/kamervagen-ford-transit/c999ce5b-4c86-400d-8f0a-2aa1e6bd2bc9.webp',
			'/images/equipment/kamervagen-ford-transit/631df6d1-44aa-4d7e-9eb4-65566e8025a5.webp',
			'/images/equipment/kamervagen-ford-transit/da88ed87-c201-42c6-81c7-5c1ef4b4d9e5.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'kamervagen-polnoprivodnyj',
		'name': 'Камерваген полноприводный',
		'slug': 'kamervagen-polnoprivodnyj',
		'category': 'Гримерные, костюмерные, актерки, штабы',
		'description': 'ГАЗ Соболь 4x4 c понижающей передачей для сложных дорожных условий',
		'specifications': [],
		'images': [
			'/images/equipment/kamervagen-polnoprivodnyj/22b8d4d6-01d8-458a-b738-2f1c201b0949.webp',
			'/images/equipment/kamervagen-polnoprivodnyj/8eb7d6a2-ac23-4046-b35b-2e3ff617901d.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'ronin-2-professional',
		'name': 'RONIN 2 Professional',
		'slug': 'ronin-2-professional',
		'category': 'Камеры, объективы, стабилизаторы',
		'description': '3-осевой стабилизатор для кинокамер с креплением на машину',
		'specifications': [],
		'images': [
			'/images/equipment/ronin-2-professional/57965cdc-6892-4e4e-9a8b-71ef292ff3a4.webp',
			'/images/equipment/ronin-2-professional/f60fdc75-a86e-4c5f-b8da-31dad153f0cb.webp',
			'/images/equipment/ronin-2-professional/908022b7-07d3-4dc2-a36c-dc1a62aff03d.webp',
			'/images/equipment/ronin-2-professional/a5368cc8-beba-4496-b8bf-b55acd904091.webp',
			'/images/equipment/ronin-2-professional/3e3623c0-5468-472d-ab4c-4d285679a0a0.webp',
			'/images/equipment/ronin-2-professional/b282904d-8b9e-44db-ab65-07a0158e5c78.webp'
		],
		'available': true,
		'featured': true
	},
	{
		'id': 'kamera-dragon-dsmc2',
		'name': 'Камера DRAGON DSMC2',
		'slug': 'kamera-dragon-dsmc2',
		'category': 'Камеры, объективы, стабилизаторы',
		'description': 'Профессиональная цифровая кинокамера',
		'specifications': [],
		'images': [
			'/images/equipment/kamera-dragon-dsmc2/6382aecf-4c30-4e6c-bef0-46c50d9b9c0c.webp',
			'/images/equipment/kamera-dragon-dsmc2/7f6e32dd-d091-42d4-a6fe-b5e8352ecf4a.webp'
		],
		'available': true,
		'featured': true
	},
	{
		'id': 'kamera-canon-eos-c500-mark-2',
		'name': 'Камера Canon EOS C500 Mark 2',
		'slug': 'kamera-canon-eos-c500-mark-2',
		'category': 'Камеры, объективы, стабилизаторы',
		'description': 'Профессиональная полнокадровая кинокамера',
		'specifications': [],
		'images': [
			'/images/equipment/kamera-canon-eos-c500-mark-2/13b96208-9aca-4fbc-bf92-ba9f97ad943b.webp'
		],
		'available': true,
		'featured': true
	},
	{
		'id': 'kamera-canon-eos-c300-mark-3',
		'name': 'Камера Canon EOS C300 Mark 3',
		'slug': 'kamera-canon-eos-c300-mark-3',
		'category': 'Камеры, объективы, стабилизаторы',
		'description': 'Профессиональная полнокадровая кинокамера',
		'specifications': [],
		'images': [
			'/images/equipment/kamera-canon-eos-c300-mark-3/f5f0558b-8a46-47ab-aebd-0ffbacf14b8b.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'nabor-obektivov-canon',
		'name': 'Набор объективов Canon',
		'slug': 'nabor-obektivov-canon',
		'category': 'Камеры, объективы, стабилизаторы',
		'description': 'Профессиональные объективы с зумом и без',
		'specifications': [
			{
				'label': 'Canon 25–250',
				'value': ''
			},
			{
				'label': 'Canon 17-120',
				'value': ''
			},
			{
				'label': 'Canon 15.5-43',
				'value': ''
			},
			{
				'label': 'Canon 32-105',
				'value': ''
			},
			{
				'label': 'Canon CN-E14mm T3.1 L F',
				'value': ''
			},
			{
				'label': 'Canon CN-E20mm T1.5 L F',
				'value': ''
			},
			{
				'label': 'Canon CN-E24mm T1.5 L F',
				'value': ''
			},
			{
				'label': 'Canon CN-E35mm T1.5 L F',
				'value': ''
			},
			{
				'label': 'Canon CN-E50mm T1.3 L F',
				'value': ''
			},
			{
				'label': 'Canon CN-E85mm T1.3 L F',
				'value': ''
			},
			{
				'label': 'Canon CN-E135mm T2.2 L F',
				'value': ''
			}
		],
		'images': [
			'/images/equipment/nabor-obektivov-canon/ce42f634-7dbc-400e-9bff-14288ea264bb.webp',
			'/images/equipment/nabor-obektivov-canon/a2dcbc9d-c826-4278-888c-35d596ad6c9e.webp',
			'/images/equipment/nabor-obektivov-canon/cd0bc36c-03ab-416e-87e6-6006db1c780a.webp'
		],
		'available': true,
		'featured': false
	},
	{
		'id': 'obektiv-angenieux-25-250',
		'name': 'Объектив ANGENIEUX 25-250',
		'slug': 'obektiv-angenieux-25-250',
		'category': 'Камеры, объективы, стабилизаторы',
		'description': 'Легендарный киносъемочный зум-объектив',
		'specifications': [],
		'images': [
			'/images/equipment/obektiv-angenieux-25-250/caa2152b-2b66-4c98-944f-3494d9abfe47.webp'
		],
		'available': true,
		'featured': true
	},
	{
		'id': 'radiofokusy-rabiokanaly-obves-kamer-canon-ot-arri',
		'name': 'Радиофокусы, рабиоканалы, обвес камер Canon от ARRI',
		'slug': 'radiofokusy-rabiokanaly-obves-kamer-canon-ot-arri',
		'category': 'Камеры, объективы, стабилизаторы',
		'description': 'Все для удобства и надежности на съемочной площадке',
		'specifications': [],
		'images': [
			'/images/equipment/radiofokusy-rabiokanaly-obves-kamer-canon-ot-arri/e98b9c77-2600-485d-a502-58f3b9ba9fee.webp'
		],
		'available': true,
		'featured': false
	}
];

/**
 * Получить список всех уникальных категорий оборудования
 * Get list of all unique equipment categories
 */
export function getCategories(): string[] {
	const categories = new Set(equipmentData.map((item) => item.category));
	return Array.from(categories).sort();
}
