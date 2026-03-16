import AlunoModel from '../models/AlunoModel.js';
import {generatePdfTodos, generatePdfs} from '../utils/pdfHelper.js'

export const relatorioPorId = async (req, res) => {
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
     'Content-Disposition': 'incline; filename="aluno_${id}.pdf"',
})

.send(pdf);
    }catch (error){
        console.error('Erro ao gerar PDF:')
        res.json({ data: aluno });
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ error: 'Erro ao buscar aluno.' });
    }
};