import {z} from 'zod';


function validateCNPJ(cnpj: string) {
	cnpj = cnpj.replace(/\D/g, "");
	if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
	let length = cnpj.length - 2;
	let numbers = cnpj.substring(0, length);
	let digits = cnpj.substring(length);
	let sum = 0;
	let pos = length - 7;
	for (let i = length; i >= 1; i--) {
		sum += Number(numbers[length - i]) * pos--;
		if (pos < 2) pos = 9;
	}
	let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (result !== parseInt(digits[0])) return false;
	length++;
	numbers = cnpj.substring(0, length);
	sum = 0;
	pos = length - 7;
	for (let i = length; i >= 1; i--) {
		sum += Number(numbers[length - i]) * pos--;
		if (pos < 2) pos = 9;
	}
	result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	return result === parseInt(digits[1]);
}



export const enterpriseFormSchema = z
  .object({
    name: z
      .string()
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {message: "Informe o nome completo da sua empresa, sem caracteres especiais"})
      .trim(),

    cnpj: z
    .string(),

    activity_type: z
    .enum(["POR AQUI NADA ", "POR NADA AQ AINDA", "POR AQUI AINDA NADA "]),

    address: z
    .string()
    .min(5, "O endereço deve ter pelo menos 5 caracteres")
    .trim(),

    neighborhood: z
    .string()
    .min(3, "O bairro deve ter pelo menos 3 caracteres")
    .trim(),

    zipcode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, "CEP inválido")
    .trim(),

    telephone_contact :z
    .string()
    .regex(/^\(\d{2}\) \d{4}-\d{4}$/, "Telefone inválido")
    .trim(),

    cellphone_contact: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido")
    .trim(),

    email: z
    .string()
    .email({ message: "Informe um e-mail válido." })
    .trim(),

    uc: z
    .enum(["sim", "nao"]),

    river_basin: z.string() .trim(),
    
    water_resource: z.string() .trim(),

    geographic_coordinates: z 
    .string()
    .trim(),

    longitude: z
    .string()
    .min(1, "Longitude obrigatória")
    .trim(),

    latitude: z
    .string()
    .min(1, "Latitude obrigatória")
    .trim(),   

    operation_phase: z 
    .string()
    .trim(),

    })

