import csv

def convert_csv_to_json(csv_file, output_files):
    """
    Convert CSV file to multiple JSON-like text files for different languages.
    
    Args:
        csv_file: Path to the CSV file
        output_files: Dictionary mapping language codes to output file paths
    """
    # Initialize data dictionaries for each language
    language_data = {
        'mr': [],
        'gu': [],
        'bn': [],
        'pa': [],
        'ml': []
    }
    
    # Read CSV and organize data by language
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Process each language
            language_data['mr'].append({
                'id': int(row['s.no']), 
                'native': row['mr'], 
                'romanized': row['mr_romanized'], 
                'translation': row['english_translation']
            })
            
            language_data['gu'].append({
                'id': int(row['s.no']), 
                'native': row['gu'], 
                'romanized': row['gu_romanized'], 
                'translation': row['english_translation']
            })
            
            language_data['bn'].append({
                'id': int(row['s.no']), 
                'native': row['bn'], 
                'romanized': row['bn_romanized'], 
                'translation': row['english_translation']
            })
            
            language_data['pa'].append({
                'id': int(row['s.no']), 
                'native': row['pa'], 
                'romanized': row['pa_romanized'], 
                'translation': row['english_translation']
            })
            
            language_data['ml'].append({
                'id': int(row['s.no']), 
                'native': row['ml'], 
                'romanized': row['ml_romanized'], 
                'translation': row['english_translation']
            })
    
    # Write data to separate files for each language
    for lang_code, data in language_data.items():
        with open(output_files[lang_code], 'w', encoding='utf-8') as f:
            for entry in data:
                f.write(str(entry) + ',\n')

# Input CSV file
csv_file = 'bro.csv'

# Output files for each language
output_files = {
    'mr': 'marathi_dict.txt',
    'gu': 'gujarati_dict.txt',
    'bn': 'bengali_dict.txt',
    'pa': 'punjabi_dict.txt',
    'ml': 'malayalam_dict.txt'
}

# Convert CSV to multiple language files
convert_csv_to_json(csv_file, output_files)