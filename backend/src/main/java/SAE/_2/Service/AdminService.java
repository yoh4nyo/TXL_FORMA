package SAE._2.Service;
import SAE._2.Repository.AdminRepository;
import SAE._2.model.Admin;
import SAE._2.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import SAE._2.exception.ResourceNotFoundException;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Iterable<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }

    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }

    public Admin updateAdmin(Long id, Admin adminDetails) {
        Admin existingAdmin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin non trouvé avec l'ID: " + id));

        existingAdmin.setIdentifiant(adminDetails.getIdentifiant());
        existingAdmin.setRole(adminDetails.getRole());
        if (adminDetails.getPassword() != null && !adminDetails.getPassword().isEmpty()) {
            existingAdmin.setPassword(adminDetails.getPassword());
        }
        return adminRepository.save(existingAdmin);
    }

    public void deleteAdminById(Long id) {
        adminRepository.deleteById(id);
    }
}
