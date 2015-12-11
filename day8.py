string_literals = 0
chrs_in_memory = 0

with open('./inputs/day8.txt', 'r') as f:
  for line in f:
    string_literals += len(line) - 1
    chrs_in_memory += len(eval(line))

print 'string_literals: ' + str(string_literals)
print 'chrs_in_memory: ' + str(chrs_in_memory)
print string_literals - chrs_in_memory

acc = 0

with open('./inputs/day8.txt', 'r') as f:
  for line in f:
    acc += 2 + line.count('\\') + line.count('"')

print acc