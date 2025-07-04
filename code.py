import csv

def convert_csv_to_json(csv_file, txt_file):
    data = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append({'id': int(row['s.no']), 'native': row['kannada'], 'romanized': row['romanized'], 'translation': row['translation']})
    
    with open(txt_file, 'w', encoding='utf-8') as f:
        for entry in data:
            f.write(str(entry) + ',\n')

csv_file = 'bro.csv'
txt_file = 'dict.txt'
convert_csv_to_json(csv_file, txt_file)