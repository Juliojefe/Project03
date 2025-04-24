@RestController
public class PostController {

    @GetMapping("/posts")
    public List<Post> getPostsByMechanic(@RequestParam int mechanicId) {
        return postService.getByMechanicId(mechanicId);
    }
}
