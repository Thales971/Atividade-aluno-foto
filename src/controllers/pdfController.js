import AlunoModel from '../models/AlunoModel.js';
import { gerarPdfAluno, gerarPdfTodos } from '../utils/pdfHelper.js';

export const gerarPdfPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const parsedId = Number.parseInt(id);
        if (Number.isNaN(parsedId)) {
            return res.status(400).json({ error: 'O ID do aluno enviado não é um número válido.' });
        }

        const aluno = await AlunoModel.buscarPorId(parsedId);

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        const pdf = await gerarPdfAluno(aluno);

        return res
            .set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="aluno_${parsedId}.pdf"`,
            })
            .send(pdf);
    } catch (error) {
        console.error('Erro ao gerar PDF por ID:', error);
        return res.status(500).json({ error: 'Erro ao gerar PDF.' });
    }
};

export const gerarPdfTodos = async (req, res) => {
    try {
        const filtros = req.query || {};
        const alunos = await AlunoModel.buscarTodos(filtros);

        const pdf = await gerarPdfTodos(alunos);

        return res
            .set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="alunos.pdf"`,
            })
            .send(pdf);
    } catch (error) {
        console.error('Erro ao gerar PDF de todos:', error);
        return res.status(500).json({ error: 'Erro ao gerar PDF.' });
    }
};
