import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model
import json
import os

model_name = "distilgpt2"

model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

tokenizer.pad_token = tokenizer.eos_token

# 🔹 récupérer le dossier du script
current_dir = os.path.dirname(__file__)
# 🔹 construire le chemin vers dataset.json
dataset_path = os.path.join(current_dir, "dataset.json")
print("📂 Loading dataset from:", dataset_path)

with open(dataset_path, "r", encoding="utf-8") as f:
    data = json.load(f)

def format_example(e):
    return f"Instruction: {e['instruction']}\nResponse: {e['output']}"

texts = [format_example(e) for e in data]

inputs = tokenizer(texts, return_tensors="pt", padding=True, truncation=True)

# LoRA
lora_config = LoraConfig(
    r=8,
    lora_alpha=16,
    target_modules=["c_attn"],  # 👈 IMPORTANT
)

model = get_peft_model(model, lora_config)

# 🔥 optimizer
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4)

# 🔥 training loop
for epoch in range(3):

    optimizer.zero_grad()

    outputs = model(**inputs, labels=inputs["input_ids"])
    loss = outputs.loss

    loss.backward()
    optimizer.step()

    print(f"Epoch {epoch} - Loss: {loss.item()}")

# 🔥 sauvegarde modèle fine-tuné
model.save_pretrained("fine_tuned_model")
tokenizer.save_pretrained("fine_tuned_model")

print("✅ Modèle sauvegardé")