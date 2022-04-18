const TaskContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
  before(async () => {
    this.tasksContract = await TaskContract.deployed();
  });

  it("Migrate deployed successfully", async () => {
    const address = this.tasksContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("GET Task List", async () => {
    const taskCounter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(taskCounter);

    assert.equal(task.id.toNumber(), taskCounter);
    assert.equal(task.title, "Mi primer tarea de ejemplo");
    assert.equal(task.description, "Tengo que hacer algo");
    assert.equal(task.done, false);
    assert.equal(taskCounter, 1);
  });

  it("Task created successfully", async () => {
    const result = await this.tasksContract.createTask(
      "Some task",
      "Description two"
    );
    const taskEvent = result.logs[0].args;
    const taskCounter = await this.tasksContract.taskCounter();

    assert.equal(taskCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "Some task");
    assert.equal(taskEvent.description, "Description two");
    assert.equal(taskEvent.done, false);
  });

  it("Task toggle done", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;
    const task = await this.tasksContract.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskEvent.done, true);
    assert.equal(taskEvent.id, 1);
  });
});
