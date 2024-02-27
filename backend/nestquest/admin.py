from django.contrib import admin
from .models import HousingOffer, HousingRequest, Message, HousingOfferImage

admin.site.register(HousingOffer)
admin.site.register(HousingRequest)
admin.site.register(Message)
admin.site.register(HousingOfferImage)