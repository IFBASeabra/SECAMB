import { validateCNPJ, validateCPF } from "@/utils/utils";
import { z } from "zod";

export const signUpFormSchema = z
	.object({
		name: z
			.string()
			.regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {message: "Informe o nome completo sem caracteres especiais"})
			.trim(),
		email: z.string().email({ message: "Informe um e-mail válido." }).trim(),
		password: z
			.string()
			.min(8, { message: "Sua senha precisa ter pelo menos 8 caracteres" })
			.regex(/[a-zA-z]/, {
				message: "Sua senha precisa ter pelo menos uma letra.",
			})
			.regex(/[0-9]/, {
				message: "Sua senha precisa ter pelo menos um número.",
			})
			.regex(/[^a-zA-z0-9]/, {
				message: "Sua senha precisa ter pelo menos um caractere especial.",
			})
			.trim(),
		password_validation: z
			.string()
			.min(8, { message: "Sua senha precisa ter pelo menos 8 caracteres" })
			.regex(/[a-zA-z]/, {
				message: "Sua senha precisa ter pelo menos uma letra.",
			})
			.regex(/[0-9]/, {
				message: "Sua senha precisa ter pelo menos um número.",
			})
			.regex(/[^a-zA-z0-9]/, {
				message: "Sua senha precisa ter pelo menos um caractere especial.",
			})
			.trim(),
		register_type: z.enum(["pessoa_fisica", "pessoa_juridica"], {
			message: "Tipo de registro inválido.",
		}),
		document: z.string(),
		address: z.string(),
		neighborhood: z.string(),
		zipcode: z.string().regex(/^\d{5}-\d{3}$/, {
			message: "CEP inválido. Use o formato XXXXX-XXX.",
		}),
	})
	.refine((data) => data.password === data.password_validation, {
		message: "As senhas não coincidem",
		path: ["password_validation"],
	})
	.superRefine((data, ctx) => {
		if (data.register_type === "pessoa_fisica" && !validateCPF(data.document)) {
			ctx.addIssue({
				path: ["document"],
				message: "CPF inválido.",
				code: "custom",
			});
		}
		if (
			data.register_type === "pessoa_juridica" &&
			!validateCNPJ(data.document)
		) {
			ctx.addIssue({
				path: ["document"],
				message: "CNPJ inválido.",
				code: "custom",
			});
		}
	});
