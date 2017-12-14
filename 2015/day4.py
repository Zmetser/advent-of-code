import hashlib

counter = 100000
hash = ''

while hash.startswith('000000') == False:
  counter += 1
  hash = hashlib.md5(str('bgvyzdsv' + str(counter)).encode()).hexdigest()

print(counter)