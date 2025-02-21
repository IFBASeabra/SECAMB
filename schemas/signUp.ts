import { z } from "zod";

function validateCPF(cpf: string) {
	cpf = cpf.replace(/\D/g, "");
	if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
	let sum = 0,
		remainder;
	for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	if (remainder !== parseInt(cpf[9])) return false;
	sum = 0;
	for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
	remainder = (sum * 10) % 11;
	if (remainder === 10 || remainder === 11) remainder = 0;
	return remainder === parseInt(cpf[10]);
}

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
