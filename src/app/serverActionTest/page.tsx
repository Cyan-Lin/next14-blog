import { addPost } from "@/lib/action";

function ServerActionTest() {
  return (
    <form action={addPost}>
      <input type="text" placeholder="title" name="title" />
      <input type="text" placeholder="desc" name="desc" />
      <input type="text" placeholder="slug" name="slug" />
      <input type="text" placeholder="userId" name="userId" />
      <button>Create A Post</button>
    </form>
  );
}

export default ServerActionTest;
