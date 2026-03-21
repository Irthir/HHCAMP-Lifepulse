from pathlib import Path
import pandas as pd

# 📍 chemin propre
BASE_DIR = Path(__file__).resolve().parent.parent
FILE_PATH = BASE_DIR / "Data" / "MTMV document de travail EV CD VRT MM revu 28 01 2022.xlsx"

df = pd.read_excel(FILE_PATH, sheet_name="APA")

# voir les colonnes
print(df.head())

dataset = []

for i in range(len(df)):

    text = df.iloc[i, 0]   # colonne A
    event = df.iloc[i, 1]  # colonne B

    # nettoyage
    if pd.isna(text):
        continue

    if pd.isna(event):
        continue

    if str(event).strip().lower() == "x":
        continue

    dataset.append({
        "text": str(text).strip(),
        "event": str(event).strip()
    })

# sauvegarde
df_out = pd.DataFrame(dataset)
df_out.to_csv(BASE_DIR / "Data" / "synthetic_dataset.csv", index=False)

print("Dataset généré :", len(df_out))