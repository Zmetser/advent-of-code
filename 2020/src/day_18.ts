import * as path from 'path';
import { readFileSync } from 'fs';

const input: string[] =
  readFileSync(path.join(__dirname, '..', 'inputs', 'day18.txt'), { encoding: 'utf-8' })
    .split('\n');

function evaluateChunk(expression: string): string {
  const [op] = expression.match(/(\d{1,})\s([\+\*])\s(\d{1,})/g) || [];
  return op ? evaluateChunk(eval(op) + expression.substring(op.length)) : expression;
}

function evaluate(expression: string): string {
  const firstClosingParen = expression.indexOf(')');
  if (firstClosingParen === -1) {
    return evaluateChunk(expression);
  }

  const innermostOpenParen = expression.substring(0, firstClosingParen).lastIndexOf('(');
  const evaluationResult = evaluateChunk(expression.substring(innermostOpenParen + 1, firstClosingParen));
  const newExpression =
    expression.substring(0, innermostOpenParen) +
    evaluationResult +
    expression.substring(firstClosingParen + 1);

  return evaluate(newExpression);
}

console.log(
  input.reduce((sum, expression) => sum + Number(evaluate(expression)), 0)
);