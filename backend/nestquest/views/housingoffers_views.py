from rest_framework.response import Response
from rest_framework.decorators import api_view

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
