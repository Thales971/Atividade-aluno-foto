import express from 'express';
import * as controller from '../controllers/alunoController.js';

const router = express.Router();

router.post('/alunos', controller.criarAluno);
router.get('/alunos', controller.buscarTodosAlunos);
router.get('/alunos/:id', controller.buscarAlunoPorId);
router.put('/alunos/:id', controller.atualizarAluno);
router.delete('/alunos/:id', controller.deletarAluno);

export default router;