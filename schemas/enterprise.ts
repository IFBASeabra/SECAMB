import { z } from "zod";

export const enterpriseFormSchema = z.object({
	name: z
		.string()
		.regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {
			message:
				"Informe o nome completo da sua empresa, sem caracteres especiais",
		})
		.trim(),

	cnpj: z.string(),

	activity_type: z.enum([
		"POR AQUI NADA ",
		"POR NADA AQ AINDA",
		"POR AQUI AINDA NADA ",
	]),

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
		.regex(/^\d{5}-\d{3}$/, {
			message: "CEP inválido. Use o formato XXXXX-XXX.",
		})
		.trim(),

	telephone_contact: z
		.string()
		.regex(/^\(\d{2}\) \d{4}-\d{4}$/, "Telefone inválido")
		.trim(),

	cellphone_contact: z
		.string()
		.regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular inválido")
		.trim(),

	email: z.string().email({ message: "Informe um e-mail válido." }).trim(),

	uc: z.enum(["sim", "nao"]),

	river_basin: z.string().trim(),

	water_resource: z.string().trim(),

	geographic_coordinates: z.string().trim(),

	longitude: z.string().min(1, "Longitude obrigatória").trim(),

	latitude: z.string().min(1, "Latitude obrigatória").trim(),

	operation_phase: z.string().trim(),
});
