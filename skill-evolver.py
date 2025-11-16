import os
import uvicorn

from fastapi import FastAPI, Request
from pydantic import BaseModel, Field
from claude_agent_sdk import query, ClaudeAgentOptions

THIS_DIR = os.path.dirname(os.path.abspath(__file__))

PROMPT_TEMPLATE = f"""
Use `skill-evolver` skill to evolve the "{skill_name}" skill based on the plan, code changes and the user feedback

- YOU need to use `git` binary to first checkout the "{branch_name}" branch
- YOU ARE ONLY ALLOWED TO MAKE CHANGES TO FILES IN `.claude/skills/{skill_name}`
- For the code changes, you are allowed to read the code and you can even compare against the main branch using `git` binary to look at what changes were made to the code
- Ignore `skill-evolver.py` file itself
- You can then git add, git commit and git push the changes to the `skill-evolver` skill

Here are the inputs:

Generated Plan for changes
---
{plan}

User Feedback
---
{feedback}
"""


class EvolveRequest(BaseModel):
    branch_name: str
    skill_name: str
    plan: str
    feedback: str


app = FastAPI()


@app.post("/evolve")
async def evolve(request: EvolveRequest):
    prompt = PROMPT_TEMPLATE.format(
        branch_name=request.branch_name,
        skill_name=request.skill_name,
        plan=request.plan,
        feedback=request.feedback,
    )
    options = ClaudeAgentOptions(
        cwd=THIS_DIR,  # Project with .claude/skills/
        setting_sources=["user", "project"],  # Load Skills from filesystem
        allowed_tools=["Skill", "Read", "Write", "Bash"],  # Enable Skill tool
        permission_mode="bypassPermissions",
        max_turns=20,
    )

    async for message in query(prompt=prompt, options=options):
        if hasattr(message, "content"):
            print(message.content)
        else:
            print(message)
        print("--------------------------------")

    return {"done": True}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
