import { Destinatario } from './Destinatario';

export interface Email {
  Remetente: string;
  Destinatarios: Array<Destinatario>;
  Mensagem: string;
}
