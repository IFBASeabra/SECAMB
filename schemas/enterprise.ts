import { z } from 'zod';

export const enterpriseFormSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {
      message:
        'Informe o nome completo da sua empresa, sem caracteres especiais',
    })
    .trim(),

  cnpj: z.string(),

  //activity_type: z.enum([
  //"POR AQUI NADA ",
  //"POR NADA AQ AINDA",
  //"POR AQUI AINDA NADA ",
  //]),

  address: z
    .string()
    .min(5, 'O endereço deve ter pelo menos 5 caracteres')
    .trim(),

  neighborhood: z
    .string()
    .min(3, 'O bairro deve ter pelo menos 3 caracteres')
    .trim(),

  zipcode: z
    .string()
    .regex(/^\d{5}-\d{3}$/, {
      message: 'CEP inválido. Use o formato XXXXX-XXX.',
    })
    .trim(),

  contact_name: z
    .string()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {
      message:
        'Informe o nome e sobrenome completo do contato, sem caracteres especiais',
    })
    .trim(),

  telephone: z.union([
    z.string().regex(/^\(\d{2}\) (?:\d{4,5}-\d{4})$/, {
      message:
        'Telefone inválido. Use o formato (XX) XXXX-XXXX ou (XX) 9XXX-XXXX.',
    }),
    z.string().length(0), // Permite string vazia ""
    z.undefined(), // Permite omitir o campo
  ]),

  cellphone: z
    .string()
    .regex(
      /^\(\d{2}\) (?:\d{4,5}-\d{4})$/,
      'Telefone inválido. Use o formato (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX.',
    )
    .optional()
    .or(z.string().length(0)), // Permite string vazia ao invés de " "

  email: z.string().email({ message: 'Informe um e-mail válido.' }).trim(),

  //uc: z.enum(["sim", "nao"]),

  river_basin: z.string().trim(),

  water_resource: z.string().trim(),

  //geographic_coordinates: z.string().trim(),

  //longitude: z.string().min(1, "Longitude obrigatória").trim(),

  //latitude: z.string().min(1, "Latitude obrigatória").trim(),

  operation_phase: z.enum(
    ['Localização', 'Instalação', 'Operação', 'Não se Aplica'],
    {
      errorMap: () => ({ message: 'Selecione uma fase válida' }),
    },
  ),
});

//Esse daqui é para a tabela de meus empreendimentos.
export const enterpriseSchema = z.object({
  id: z.number(),
  name: z.string(),
  id_contact: z.string(),
});

export type Enterprise = z.infer<typeof enterpriseSchema>;
