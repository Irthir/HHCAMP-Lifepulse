from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "fine_tuned_model"

model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

def generate_question(instruction):
    prompt = f"Instruction: {instruction}\nResponse:"

    inputs = tokenizer(prompt, return_tensors="pt")

    outputs = model.generate(**inputs, max_new_tokens=50)

    return tokenizer.decode(outputs[0], skip_special_tokens=True)


print(generate_question("Pose une question sur la fatigue"))