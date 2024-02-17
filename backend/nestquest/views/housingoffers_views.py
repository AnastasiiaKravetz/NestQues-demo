from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from nestquest.models import HousingOffer
from nestquest.serializers import HousingOfferSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def getOffers(request):

    query = request.query_params.get('keyword', '')
    
    offers = HousingOffer.objects.filter(
        title__icontains=query) 
    
    page = request.query_params.get('page')
    paginator = Paginator(offers, 10)

    try:
        offers = paginator.page(page)
    except PageNotAnInteger:
        offers = paginator.page(1)
    except EmptyPage:
        offers = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)

    serializer = HousingOfferSerializer(offers, many=True)
    return Response({'offers': serializer.data, 'page': page, 'pages': paginator.num_pages})



@api_view(['GET'])
def getOffer(request, pk):
    
    offer = HousingOffer.objects.get(_id=pk)
    serializer = HousingOfferSerializer(offer, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
def deleteOffer(request, pk):
    
    offer = HousingOffer.objects.get(_id=pk)
    offer.delete()
    return Response('Deleted')







@api_view(['POST'])
def createOffer(request):
    try:
        user = request.user

        offer = HousingOffer.objects.create(
            user=user,
            title='Sample Title',
            price=0,  
            location='Sample Location',
            is_furnished=1,  
            number_of_rooms=3,
            is_pet_friendly=1,  
            description=''
        )

        serializer = HousingOfferSerializer(offer, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)




@api_view(['PUT'])
def updateOffer(request, pk):
    try:
        data = request.data
        offer = HousingOffer.objects.get(_id=pk)

        offer.title = data.get('title', offer.title)
        offer.price = data.get('price', offer.price)
        offer.is_furnished = data.get('is_furnished', offer.is_furnished)
        offer.is_pet_friendly = data.get('is_pet_friendly', offer.is_pet_friendly)
        offer.location = data.get('location', offer.location)
        offer.number_of_rooms = data.get('number_of_rooms', offer.number_of_rooms)
        offer.description = data.get('description', offer.description)

        offer.save()

        serializer = HousingOfferSerializer(offer, many=False)
        return Response(serializer.data)
    except HousingOffer.DoesNotExist:
        return Response('Offer not found', status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(str(e), status=status.HTTP_400_BAD_REQUEST)



