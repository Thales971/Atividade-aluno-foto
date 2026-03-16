import express from 'express';
import * as controller from '../controllers/pdfController.js';

const router = express.Router();

// Gera PDF de um aluno específico
router.get('/:id/pdf', controller.gerarPdfPorId);

// Gera PDF de todos os alunos (aceita filtros via query)
router.get('/pdf', controller.gerarPdfTodos);

export default router;
