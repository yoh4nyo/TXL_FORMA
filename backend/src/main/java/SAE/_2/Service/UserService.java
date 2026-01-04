package SAE._2.Service;

import SAE._2.Repository.UserRepository;
import SAE._2.exception.ResourceNotFoundException;
import SAE._2.model.Session;
import SAE._2.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {return userRepository.save(user);}

    public Iterable<User> getAllUser() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(Long id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User non trouvé avec l'ID: " + id));

        existingUser.setIdentifiant(userDetails.getIdentifiant());
        existingUser.setRole(userDetails.getRole());
        existingUser.setPassword(userDetails.getPassword());

        return userRepository.save(existingUser);
    }


    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}
