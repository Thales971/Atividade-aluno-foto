import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela exemplo...');

    // Remove todos os registros
    // await prisma.exemplo.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.aluno.createMany({
        data: [
            { nome: 'Ana', escola: 'Escola A', turma: '1A', foto: 'ana.jpg' },
            { nome: 'Bruno', escola: 'Escola B', turma: '2B', foto: 'bruno.jpg' },
            { nome: 'Carla', escola: 'Escola C', turma: '3C', foto: 'carla.jpg' },
            { nome: 'Daniel', escola: 'Escola D', turma: '4D', foto: 'daniel.jpg' },
            { nome: 'Eduarda', escola: 'Escola E', turma: '5E', foto: 'eduarda.jpg' },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
