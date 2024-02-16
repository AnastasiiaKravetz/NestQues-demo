from django.db import models
from django.contrib.auth.models import User

STATUS_CHOICES = (
    (1, 'Yes'),
    (2, 'No')
)

class HousingOffer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)  
    number_of_rooms = models.PositiveSmallIntegerField()   
    is_furnished = models.PositiveSmallIntegerField(choices=STATUS_CHOICES)    
    is_pet_friendly = models.PositiveSmallIntegerField(choices=STATUS_CHOICES) 
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

class HousingRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    desired_location = models.CharField(max_length=100)
    max_price = models.DecimalField(max_digits=10, decimal_places=2)
    min_bedrooms = models.PositiveSmallIntegerField(default=1)
    min_bathrooms = models.PositiveSmallIntegerField(default=1)
    move_in_date = models.DateField(null=True, blank=True) 
    is_furnished_desired = models.PositiveSmallIntegerField(choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
